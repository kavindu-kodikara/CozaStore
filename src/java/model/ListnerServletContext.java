/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/ServletListener.java to edit this template
 */
package model;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import org.hibernate.Session;

/**
 * Web application lifecycle listener.
 *
 * @author kv
 */
public class ListnerServletContext implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        
        System.out.println("session creat Start");

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.close();
        
        System.out.println("session creat End");
        
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }
}
