/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Category;
import entity.Color;
import entity.Size;
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
import org.hibernate.criterion.Order;

/**
 *
 * @author kv
 */
@WebServlet(name = "LoadAddProductComponents", urlPatterns = {"/LoadAddProductComponents"})
public class LoadAddProductComponents extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("success", false);
        Session session = HibernateUtil.getSessionFactory().openSession();
        
        Criteria criteria1 = session.createCriteria(Category.class);
        List<Category> categoryList = criteria1.list();
        
        Criteria criteria2 = session.createCriteria(SubCategory.class);
        List<SubCategory> subCategoryList = criteria2.list();
             
        Criteria criteria3 = session.createCriteria(Color.class);
        List<SubCategory> colorList = criteria3.list();
             
        Criteria criteria4 = session.createCriteria(Size.class);
        List<SubCategory> sizeList = criteria4.list();
        
        jsonObject.add("categoryList", gson.toJsonTree(categoryList));
        jsonObject.add("subCategoryList", gson.toJsonTree(subCategoryList));
        jsonObject.add("colorList", gson.toJsonTree(colorList));
        jsonObject.add("sizeList", gson.toJsonTree(sizeList));
        
        jsonObject.addProperty("success", true);
        
        session.close();
        
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));

    }

  

}
