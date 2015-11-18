/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package imageSharing;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Artsi
 */
@Entity
@Table(name = "images")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Images.findAll", query = "SELECT i FROM Images i"),
    @NamedQuery(name = "Images.findById", query = "SELECT i FROM Images i WHERE i.id = :id"),
    @NamedQuery(name = "Images.findByPath", query = "SELECT i FROM Images i WHERE i.path = :path"),
    @NamedQuery(name = "Images.findByFileSize", query = "SELECT i FROM Images i WHERE i.fileSize = :fileSize"),
    @NamedQuery(name = "Images.findByUploadDate", query = "SELECT i FROM Images i WHERE i.uploadDate = :uploadDate"),
    @NamedQuery(name = "Images.findByFileName", query = "SELECT i FROM Images i WHERE i.fileName = :fileName")})
public class Images implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "path")
    private String path;
    @Basic(optional = false)
    @NotNull
    @Column(name = "fileSize")
    private int fileSize;
    @Column(name = "uploadDate")
    @Temporal(TemporalType.DATE)
    private Date uploadDate;
    @Size(max = 255)
    @Column(name = "fileName")
    private String fileName;
    @JoinColumn(name = "FK_owner", referencedColumnName = "id")
    @ManyToOne
    private Users fKowner;

    public Images() {
    }

    public Images(Integer id) {
        this.id = id;
    }

    public Images(Integer id, String path, int fileSize) {
        this.id = id;
        this.path = path;
        this.fileSize = fileSize;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getFileSize() {
        return fileSize;
    }

    public void setFileSize(int fileSize) {
        this.fileSize = fileSize;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Users getFKowner() {
        return fKowner;
    }

    public void setFKowner(Users fKowner) {
        this.fKowner = fKowner;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Images)) {
            return false;
        }
        Images other = (Images) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "imageSharing.Images[ id=" + id + " ]";
    }
    
}
