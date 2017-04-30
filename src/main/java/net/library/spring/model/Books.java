package net.library.spring.model;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.internal.NotNull;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;

/**
 * Created by Admin on 29.04.2017.
 */


@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name="booknew")
public class Books {








    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private int id;



    @Column(name = "name")
    @NotNull
    private String name;




    @Column(name = "status")
    @NotNull
    private String status;



    @Column(name = "info")
    @NotNull
    private String info;


    public Books() {

    }

    public Books(String name, String info) {
        this.name = name;
        this.info = info;

    }




    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
