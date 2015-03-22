/**
 * 
 */
package org.srcm.gems.regapp.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.srcm.gems.regapp.dao.RolesDAO;
import org.srcm.gems.regapp.dao.UserDAO;
import org.srcm.gems.regapp.domain.Role;
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

	@RequestMapping(value="/getAllRoles",method=RequestMethod.GET)
	@ResponseBody
	public List<Role> getAllRoles(){
		return rolesDAO.selectAllRoles();
		
	}
	
	@RequestMapping(value="/deleteRole",method=RequestMethod.POST)
	@ResponseBody
	public void deleteRole(@RequestBody Role role){
		rolesDAO.deleteRole(role);
		
	}
	
	@RequestMapping(value="/addRole",method=RequestMethod.POST)
	@ResponseBody
	public String addRole(@RequestBody Role role) {
		if (role != null) {
			role.setCreationTimeStamp(new Date());
			role.setLastUpdatedTimeStamp(new Date());
			rolesDAO.addRole(role);
			return "Success";
		} else {
			return "Failure";
		}

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
	public String addUserRoleMapping(@RequestBody Map<String, List<Integer>> roleUserIdMap) {
		if (roleUserIdMap != null) {

			for (int userId : roleUserIdMap.get("userIds")) {
				rolesDAO.addUserRoleMapping(roleUserIdMap.get("roleIds").get(0), userId);
			}
			return "Success";
		} else {
			return "Failure";
		}

	}
	
	@RequestMapping(value="/addUser",method=RequestMethod.POST)
	@ResponseBody
	public String addUser(@RequestBody User user) {
		if (user != null) {
			user.setCreationDate(new Date());
			user.setLastUpdatedDate(new Date());
			userDAO.addUser(user);
			return "Success";
		} else {
			return "Failure";
		}

	}
	
}
