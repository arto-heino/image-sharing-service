/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package imageSharing;

import imageSharingDatabase.Images;
import imageSharingDatabase.Tag;
import imageSharingDatabase.Tags;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Artsi
 */
@WebServlet(name = "showImgByTag", urlPatterns = {"/showImgByTag"})
public class showImgByTag extends HttpServlet {

    EntityManagerFactory emf;
    EntityManager em;
    int tagId;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            emf = Persistence.createEntityManagerFactory("image-sharing-servicePU");
            em = emf.createEntityManager();

            JsonArrayBuilder builder = Json.createArrayBuilder();

            String tagFromDb = request.getParameter("tag");

            int imageId;

            for (Tag t : (List<Tag>) em.createQuery("SELECT t FROM Tag t").getResultList()) {
                if (tagFromDb == null ? t.getName() == null : tagFromDb.equals(t.getName())) {
                    tagId = t.getId();
                }else{
                    tagId = 2;
                }
            }

            for (Tags t : (List<Tags>) em.createQuery("SELECT t FROM Tags t").getResultList()) {
                if (tagId == t.getId()) {
                    imageId = t.getFKimg().getId();
                    for (Images i : (List<Images>) em.createQuery("SELECT i FROM Images i").getResultList()) {
                        if (imageId == i.getId()){
                    builder.add(Json.createObjectBuilder()
                            .add("path", i.getPath())
                            .add("id", i.getId()));
                }
                    }
            }
            }
            JsonArray arr = builder.build();
            out.println(arr);

        } catch (Exception e) {
            out.println(e);
        } finally {
            em.close();
            emf.close();
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
