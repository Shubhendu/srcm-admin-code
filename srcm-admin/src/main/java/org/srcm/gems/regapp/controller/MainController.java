/**
 * 
 */
package org.srcm.gems.regapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author singh_sh
 *
 */
@Controller
public class MainController {

	@RequestMapping(value = "/",method=RequestMethod.GET)
	public String getMainPage(){
		return "index";
	}
}
