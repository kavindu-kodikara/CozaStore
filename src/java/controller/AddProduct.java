/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.UserDTO;
import entity.Category;
import entity.Color;
import entity.Product;
import entity.Size;
import entity.SubCategory;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import model.HibernateUtil;
import model.Validation;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author kv
 */
@MultipartConfig
@WebServlet(name = "AddProduct", urlPatterns = {"/AddProduct"})
public class AddProduct extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("success", false);
        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();

        String categoryId = req.getParameter("categoryId");
        String subCategoryId = req.getParameter("subCategoryId");
        String title = req.getParameter("title");
        String colorId = req.getParameter("colorId");
        String sizeId = req.getParameter("sizeId");
        String price = req.getParameter("price");
        String qty = req.getParameter("qty");
        String description = req.getParameter("description");

        Part image1 = req.getPart("image1");
        Part image2 = req.getPart("image2");
        Part image3 = req.getPart("image3");

        if (categoryId.equals("0")) {
            jsonObject.addProperty("content", "Please select category");
        } else if (subCategoryId.equals("0")) {
            jsonObject.addProperty("content", "Please select sub category");
        } else if (title.isEmpty()) {
            jsonObject.addProperty("content", "Please enter Title");
        } else if (colorId.equals("0")) {
            jsonObject.addProperty("content", "Please select color");
        } else if (sizeId.equals("0")) {
            jsonObject.addProperty("content", "Please select size");
        } else if (price.isEmpty()) {
            jsonObject.addProperty("content", "Please enter price");
        } else if (Double.parseDouble(price) <= 0) {
            jsonObject.addProperty("content", "Invalid price");
        } else if (qty.isEmpty()) {
            jsonObject.addProperty("content", "Please enter quantity");
        } else if (Integer.parseInt(qty) <= 0) {
            jsonObject.addProperty("content", "Invalid quantity");
        } else if (description.isEmpty()) {
            jsonObject.addProperty("content", "Please enter discription");
        } else if (image1.getSubmittedFileName() == null) {
            jsonObject.addProperty("content", "Please select image1");
        } else if (image2.getSubmittedFileName() == null) {
            jsonObject.addProperty("content", "Please select image2");
        } else if (image3.getSubmittedFileName() == null) {
            jsonObject.addProperty("content", "Please select image3");
        } else {

            UserDTO userDTO = (UserDTO) req.getSession().getAttribute("user");
            

            if (userDTO != null) {
            System.out.println(userDTO.getEmail());
                jsonObject.addProperty("sign", true);

                Category category = (Category) session.get(Category.class, Integer.parseInt(categoryId));
                SubCategory subCategory = (SubCategory) session.get(SubCategory.class, Integer.parseInt(subCategoryId));
                Color color = (Color) session.get(Color.class, Integer.parseInt(colorId));
                Size size = (Size) session.get(Size.class, Integer.parseInt(sizeId));

                Criteria criteria1 = session.createCriteria(User.class);
                criteria1.add(Restrictions.eq("email", userDTO.getEmail()));
                User user = (User) criteria1.uniqueResult();

                Product product = new Product();

                product.setColor(color);
                product.setDate(new Date());
                product.setDescription(description);
                product.setPrice(Double.parseDouble(price));
                product.setQty(Integer.parseInt(qty));
                product.setStatus(1);
                product.setSubCategory(subCategory);
                product.setTitle(title);
                product.setUser(user);
                product.setSize(size);

                //get auto increment id when save
                int pid = (int) session.save(product);
                session.beginTransaction().commit();

                System.out.println("product added");

                String applicatinPath = req.getServletContext().getRealPath("");
                String newApplicationPath = applicatinPath.replace("build\\web", "web");

                File folder = new File(newApplicationPath + "//product-images//" + pid);

                folder.mkdir();

                File file1 = new File(folder, "image1.png");
                InputStream inputStream1 = image1.getInputStream();
                Files.copy(inputStream1, file1.toPath(), StandardCopyOption.REPLACE_EXISTING);

                File file2 = new File(folder, "image2.png");
                InputStream inputStream2 = image2.getInputStream();
                Files.copy(inputStream2, file2.toPath(), StandardCopyOption.REPLACE_EXISTING);

                File file3 = new File(folder, "image3.png");
                InputStream inputStream3 = image3.getInputStream();
                Files.copy(inputStream3, file3.toPath(), StandardCopyOption.REPLACE_EXISTING);

                System.out.println("Product img saved");
                
                jsonObject.addProperty("success", true);
                jsonObject.addProperty("content", "New Product Added");

            } else {
                jsonObject.addProperty("sign", false);
                jsonObject.addProperty("content", "Please sign in to continue");
            }

        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));

        session.close();

    }

}
