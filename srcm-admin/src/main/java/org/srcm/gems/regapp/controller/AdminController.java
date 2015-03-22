/**
 * 
 */
package org.srcm.gems.regapp.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.srcm.gems.regapp.dao.RolesDAO;
import org.srcm.gems.regapp.dao.SeminarDAO;
import org.srcm.gems.regapp.dao.UserDAO;
import org.srcm.gems.regapp.domain.Role;
import org.srcm.gems.regapp.domain.Seminar;
import org.srcm.gems.regapp.domain.User;

/**
 * @author singh_sh
 *
 */
@Controller
@RequestMapping(value="/admin")
public class AdminController {
	@Autowired
	private RolesDAO rolesDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private SeminarDAO seminarDAO;

	@RequestMapping(value="/getAllRoles",method=RequestMethod.GET)
	@ResponseBody
	public List<Role> getAllRoles(){
		return rolesDAO.selectAllRoles();
		
	}
	
	@RequestMapping(value="/getAllSeminars",method=RequestMethod.GET)
	@ResponseBody
	public List<Seminar> getAllSeminars(){
		return seminarDAO.getAllSeminars();
		
	}
	
	@RequestMapping(value="/deleteRole",method=RequestMethod.POST)
	@ResponseBody
	public void deleteRole(@RequestBody Role role){
		rolesDAO.deleteRole(role);
		
	}
	
	@RequestMapping(value="/addRole",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,String> addRole(@RequestBody Role role) {
		Map<String,String> resultMap = new HashMap<String, String>();
		if (role != null) {
			role.setCreationTimeStamp(new Date());
			role.setLastUpdatedTimeStamp(new Date());
			rolesDAO.addRole(role);
			resultMap.put("status","Success"); 
		} else {
			resultMap.put("status","Failure"); 
		}
		return resultMap;

	}
	
	@RequestMapping(value="/getAllUsers",method=RequestMethod.GET)
	@ResponseBody
	public List<User> getAllUsers(){
		List<User> users = userDAO.getAllUsers();
		for(User user: users){
			if(user.getRoles() !=null && !user.getRoles().isEmpty()){
				String str = null;
				
				for(Role role: user.getRoles()){
					if(StringUtils.isEmpty(str)){
						str = role.getRoleName();
					}else{
						str +=","+ role.getRoleName();
					}
				}
				user.setRoleNames(str);
			}
		}
		return users;
	}
	
	@RequestMapping(value="/addUserRoleMapping",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,String> addUserRoleMapping(@RequestBody Map<String, List<Integer>> roleUserIdMap) {
		Map<String,String> resultMap = new HashMap<String, String>();
		if (roleUserIdMap != null) {

			for (int userId : roleUserIdMap.get("userIds")) {
				rolesDAO.addUserRoleMapping(roleUserIdMap.get("roleIds").get(0), userId);
			}
			resultMap.put("status","Success");
		} else {
			 resultMap.put("status","Failure"); 
		}
		return resultMap;
	}
	
	@RequestMapping(value="/addUser",method=RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Map<String,String> addUser(@RequestBody User user) {
		Map<String,String> resultMap = new HashMap<String, String>();
		if (user != null) {
			user.setCreationDate(new Date());
			user.setLastUpdatedDate(new Date());
			userDAO.addUser(user);
			resultMap.put("status","Success");
		} else {
			resultMap.put("status","Failure"); 
		}
		return resultMap;
	}
	
	@RequestMapping(value="/addSeminarUserRoleMapping",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,String> addSeminarUserRoleMapping(@RequestBody Map<String, List<Integer>> roleUserIdMap) {
		Map<String,String> resultMap = new HashMap<String, String>();
		if (roleUserIdMap != null) {
			int seminarId = roleUserIdMap.get("seminarIds").get(0);

			for (int userId : roleUserIdMap.get("userIds")) {
				rolesDAO.addSeminarUserRoleMapping(seminarId,roleUserIdMap.get("roleIds").get(0), userId);
			}
			resultMap.put("status","Success");
		} else {
			 resultMap.put("status","Failure"); 
		}
		return resultMap;
	}
	
}
