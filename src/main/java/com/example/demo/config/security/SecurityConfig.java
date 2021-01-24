package com.example.demo.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
@EnableWebSecurity //помечаю класс как класс ответственный за security конфигурации(можно не писать @Configuration)
@ComponentScan("com.example.demo")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final SuccessHandler successUserHandler;

    public SecurityConfig(@Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService, SuccessHandler successUserHandler) {
        this.userDetailsService = userDetailsService;
        this.successUserHandler = successUserHandler;
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();



        http.authorizeRequests()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/user/admin").hasRole("ADMIN")
                .antMatchers("/user").hasAnyRole("ADMIN", "USER")
                .anyRequest().authenticated()
                .and().logout()   //logout configuration
                .logoutUrl("/appLogout")
                .logoutSuccessUrl("/login");

        http.formLogin()
                .successHandler(successUserHandler)
                .permitAll();
    }
}


