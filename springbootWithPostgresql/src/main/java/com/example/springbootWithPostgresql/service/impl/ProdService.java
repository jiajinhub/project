    package com.example.springbootWithPostgresql.service.impl;


    import com.example.springbootWithPostgresql.entity.ExpiryNotify;
    import com.example.springbootWithPostgresql.entity.ProductEntity;
    import com.example.springbootWithPostgresql.pattern.Observer.EmailNotificationListener;
    import com.example.springbootWithPostgresql.pattern.Observer.ProductExpiryNotifier;
    import com.example.springbootWithPostgresql.repository.ProdRepo;
    import jdk.jfr.Enabled;
    import org.apache.poi.ss.usermodel.Workbook;
    import org.apache.poi.xssf.usermodel.XSSFWorkbook;
    import org.apache.tomcat.util.json.JSONParser;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.scheduling.annotation.Scheduled;
    import org.springframework.stereotype.Service;
    import org.apache.poi.ss.usermodel.Sheet;
    import org.apache.poi.ss.usermodel.Row;

    import java.io.ByteArrayOutputStream;
    import java.text.SimpleDateFormat;
    import java.util.*;

    @Service
    public class ProdService {

        @Autowired
        ProdRepo prodRepo;

        @Autowired
        ProductExpiryNotifier productExpiryNotifier;

        @Autowired
        EmailService emailService;

        public List<ProductEntity> getAllProduct() {
            return prodRepo.findAll();
        }

        public ProductEntity insertProd(ProductEntity prod) {
            ProductEntity response = prodRepo.save(prod);
            System.out.println("prod saved to db with prodId : " + response.getProductId());
            return response;
        }

        public ProductEntity updateProd(ProductEntity prod) {
            ProductEntity affectedData;
            Optional<ProductEntity> prodDetailOpt = prodRepo.findById(prod.getProductId());
            if(prodDetailOpt.isPresent()){
                ProductEntity prodDetail = prodDetailOpt.get();
                if(prod.getName() != null || prod.getName().isEmpty())
                    prodDetail.setName(prod.getName());
                if(prod.getExpiryDate() != null)
                    prodDetail.setExpiryDate(prod.getExpiryDate());
                if(prod.getCategory() != null)
                    prodDetail.setCategory(prod.getCategory());
                if(prod.getPrice() != null)
                    prodDetail.setPrice(prod.getPrice());
                if(prod.getNutriGrade() != null)
                    prodDetail.setNutriGrade(prod.getNutriGrade());
                if(prod.getDescription() != null)
                    prodDetail.setDescription(prod.getDescription());
                prodDetail.setQuantity(prod.getQuantity());
                affectedData = prodRepo.save(prodDetail);
            }else{
                throw new RuntimeException("prod not found.");
            }
            return affectedData;
        }

        public void deleteProd(Long prodId) {
            Optional<ProductEntity> userOpt = prodRepo.findById(prodId);
            if(userOpt.isPresent())
                prodRepo.deleteById(prodId);
            else
                throw new RuntimeException("prod not found.");
        }



        //@Scheduled(fixedRate = 60000)
        public void sendEmail(){

            Date currentDate = new Date(System.currentTimeMillis());
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yy HH:mm");
            String formattedDate = dateFormat.format(currentDate);

            String to = "jiajintest123123@gmail.com";
            String subject = "Test Email";
            String text = "This is a test email from batch. "  + formattedDate;
            emailService.sendSimpleMessage(to, subject, text);
            System.out.println("Successfully send " + formattedDate);
        }

        public ProductEntity getProdById(Long prodId) {
            Optional<ProductEntity> prodOpt = prodRepo.findById(prodId);
            if(prodOpt.isPresent())
                return prodOpt.get();
            else
                throw new RuntimeException("product not found.");
        }
        @Scheduled(cron = "0 0 * * * *")
        public void sendExpiryNotificationEmail(){

            try {
                List<Map<String, Object>> resultList = prodRepo.getExpiryNotificationBatch();
                List<ExpiryNotify> expiryNotifyList = new ArrayList<ExpiryNotify>();

                for (Map<String, Object> row : resultList) {
                    ExpiryNotify expiryNotify = new ExpiryNotify();
                    expiryNotify.setEmail((String) row.get("email"));
                    expiryNotify.setUser((String) row.get("user"));
                    expiryNotify.setProdName((String) row.get("prodName"));
                    expiryNotify.setQuantity((int) row.get("quantity"));
                    expiryNotify.setListName((String) row.get("listName"));
                    expiryNotifyList.add(expiryNotify);
                }


                EmailNotificationListener emailNotificationListener = new EmailNotificationListener();
                productExpiryNotifier.addObserver(emailNotificationListener);


                for (ExpiryNotify list : expiryNotifyList) {
                    productExpiryNotifier.productAboutToExpire(list);
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        public byte[] createExcel(Long listId){
            // Create a workbook
            Workbook workbook = new XSSFWorkbook();

            // Create a sheet
            Sheet sheet = workbook.createSheet("Products");

            // Create header row
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Product ID");
            headerRow.createCell(1).setCellValue("Name");
            headerRow.createCell(2).setCellValue("Expiry Date");
            headerRow.createCell(3).setCellValue("List ID");
            headerRow.createCell(4).setCellValue("Quantity");
            headerRow.createCell(5).setCellValue("Nutri Grade");
            headerRow.createCell(6).setCellValue("Description");
            headerRow.createCell(7).setCellValue("Price");
            headerRow.createCell(8).setCellValue("Category");

            List<ProductEntity> products = prodRepo.getAllByListId(listId);

            try {
                // Populate data rows
                int rowNum = 1;
                for (ProductEntity product : products) {
                    Row row = sheet.createRow(rowNum++);
                    row.createCell(0).setCellValue(product.getProductId());
                    row.createCell(1).setCellValue(product.getName());
                    row.createCell(2).setCellValue(product.getExpiryDate().toString());
                    row.createCell(3).setCellValue(product.getListId());
                    row.createCell(4).setCellValue(product.getQuantity());
                    row.createCell(5).setCellValue(product.getNutriGrade());
                    row.createCell(6).setCellValue(product.getDescription());
                    row.createCell(7).setCellValue(product.getPrice());
                    row.createCell(8).setCellValue(product.getCategory());
                }

                // Write the workbook content to a ByteArrayOutputStream
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                workbook.write(outputStream);
                workbook.close();
                return outputStream.toByteArray();
            }catch(Exception e){
                System.out.println(e);
            }

            return null;
        }

        public List<ProductEntity> forTest() {
            return prodRepo.getAllByListId( 1L );
        }

    }
