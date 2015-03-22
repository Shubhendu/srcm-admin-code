/**
 * 
 */
package org.srcm.gems.regapp.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author singh_sh
 *
 */
@Entity
@Table(name="SEMINAR_USER_ROLE_MAPPING")
//@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
@JsonIgnoreProperties({"users","roles","seminar"})
public class SeminarUserRoleMapping  implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7758947121587153365L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="SEMINAR_USER_ROLE_MAPPING_ID")
	private int id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="USER_ID")
//	@JsonManagedReference
	private User user;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="ROLE_ID")
//	@JsonManagedReference
	private Role role;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SEMINAR_ID")
//	@JsonManagedReference
	private Seminar seminar;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Seminar getSeminar() {
		return seminar;
	}

	public void setSeminar(Seminar seminar) {
		this.seminar = seminar;
	}
	
	
	

}
