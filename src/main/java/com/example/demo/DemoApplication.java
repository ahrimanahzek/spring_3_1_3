package com.example.demo;

import com.example.demo.dao.RoleDao;
import com.example.demo.models.RoleFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	static class MyConfig extends WebMvcConfigurerAdapter {
		@Autowired
		RoleDao roleDao;
		public void addFormatters(FormatterRegistry registry) {

			registry.addFormatter(new RoleFormatter(roleDao));
		}
	}

}
