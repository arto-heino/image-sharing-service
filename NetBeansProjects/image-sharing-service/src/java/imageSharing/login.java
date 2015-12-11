/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package imageSharing;

import imageSharingDatabase.Users;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import java.util.ArrayList;


/**
 *
 * @author Kade
 */
@WebServlet(name = "login", urlPatterns = {"/login"})
public class login extends HttpServlet {
    EntityManagerFactory emf;
    EntityManager em;
    Boolean logged;
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
        try {
            
            emf = Persistence.createEntityManagerFactory("image-sharing-servicePU");
                em = emf.createEntityManager();
                logged = false;
                
                
                String username = request.getParameter("username");
                String password = request.getParameter("password");
                
                Users loginUser = new Users();
                loginUser.setUsername(username);
                loginUser.setPassword(password);
                
                Query q = em.createQuery("SELECT u FROM Users u");
                List<Users> userList = q.getResultList();
                int userFKRole = 0;
                for (Users user : userList) {
                     if (loginUser.getUsername().equalsIgnoreCase(user.getUsername())&&loginUser.getPassword().equals(user.getPassword())) { 
                        logged = true;
                        userFKRole = user.getFKRole().getRole();
                    } 
                    
                }
                
                
                
                String json;
               
               List<String> infos = new ArrayList<String>();
               infos.add(loginUser.getUsername());
               infos.add(Integer.toString(userFKRole));
               
                if (logged){
                     json = new Gson().toJson(infos);
                    
                    
                    
                } 
                else json = "False";
                
                out.write(json);
                
            } catch (Exception e) {
                out.println("BOOM : " + e);
            } finally {
                em.close();
                emf.close();
            }
    }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}