/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.ResponseDTO;
import entity.Product;
import entity.SubCategory;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author kv
 */
@WebServlet(name = "LoadSingleProduct", urlPatterns = {"/LoadSingleProduct"})
public class LoadSingleProduct extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        System.out.println("ok");

         try {

            String productId = req.getParameter("id");

            Gson gson = new Gson();
            Session session = HibernateUtil.getSessionFactory().openSession();

            Product product = (Product) session.get(Product.class, Integer.parseInt(productId));
            product.getUser().setPassword(null);
            product.getUser().setVerification(null);
            product.getUser().setEmail(null);
            
            JsonObject jsonObject = new JsonObject();
            jsonObject.add("product", gson.toJsonTree(product));
            
             System.out.println(product.getTitle());

            resp.setContentType("applicaion/json");
            resp.getWriter().write(gson.toJson(jsonObject));

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    

}
