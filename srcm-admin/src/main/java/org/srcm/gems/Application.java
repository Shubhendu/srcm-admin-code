package org.srcm.gems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.srcm.gems.regapp.dao.RolesDAO;
import org.srcm.gems.regapp.dao.RolesDAOImpl;
import org.srcm.gems.regapp.dao.UserDAO;
import org.srcm.gems.regapp.dao.UserDAOImpl;

/**
 * @author Shubhendu Singh (shubhendu.singh@getinsured.com)
 */
@SpringBootApplication
@EnableJpaRepositories
//@EnableWebMvc
//@EnableAutoConfiguration
//@Configuration
public class Application extends SpringBootServletInitializer {
	public static void main(final String[] args) {
        SpringApplication.run(Application.class, args);
    }
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}


	
//	@Bean
//	public RolesDAO getRolesDAO(){
//		return new RolesDAOImpl();
//		
//	}
	
	
	@Bean
	public UserDAO getUserDAO(){
		return new UserDAOImpl();
		
	}

	
}
