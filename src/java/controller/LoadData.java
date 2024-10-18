/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Category;
import entity.Color;
import entity.Product;
import entity.Size;
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
import org.hibernate.criterion.Order;

/**
 *
 * @author kv
 */
@WebServlet(name = "LoadData", urlPatterns = {"/LoadData"})
public class LoadData extends HttpServlet {

 @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("success", false);
        Session session = HibernateUtil.getSessionFactory().openSession();
        
        //main code
        
        //get category list from db
        Criteria criteria1 = session.createCriteria(Category.class);
        List<Category> categoryList = criteria1.list();
        jsonObject.add("categoryList", gson.toJsonTree(categoryList));
        
        //get colorList list from db
        Criteria criteria3 = session.createCriteria(Color.class);
        List<Color> colorList = criteria3.list();
        jsonObject.add("colorList", gson.toJsonTree(colorList));
        
        //get storageList list from db
        Criteria criteria4 = session.createCriteria(Size.class);
        List<Size> storageList = criteria4.list();
        jsonObject.add("sizeList", gson.toJsonTree(storageList));
        
        //get product list from db
        Criteria criteria5 = session.createCriteria(Product.class);
        
        //get latest products
        criteria5.addOrder(Order.desc("id"));
        jsonObject.addProperty("allProductCount", criteria5.list().size());
        
        //set product range
        
        criteria5.setFirstResult(0);
        criteria5.setMaxResults(8);
        
        List<Product> productList = criteria5.list();
        
        //remove user from product
        for (Product product : productList) {
            product.setUser(null);
        }
        
        jsonObject.add("productList", gson.toJsonTree(productList));
        
        jsonObject.addProperty("success", true);
        
        //main code
        
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));
        

    }

}
