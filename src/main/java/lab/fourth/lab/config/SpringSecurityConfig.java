package lab.fourth.lab.config;

import lab.fourth.lab.security.JwtCsrfFilter;
import lab.fourth.lab.security.JwtTokenRepository;
import lab.fourth.lab.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Configuration
public class SpringSecurityConfig {

    //private final UserService service;

    //private final JwtTokenRepository jwtTokenRepository;

    //@Qualifier("handlerExceptionResolver")
    //private final HandlerExceptionResolver resolver;

    /*public SpringSecurityConfig(
            //@Autowired UserService service,
            //@Autowired JwtTokenRepository jwtTokenRepository,
            @Autowired HandlerExceptionResolver resolver) {
        //this.service = service;
        //this.jwtTokenRepository = jwtTokenRepository;
        this.resolver = resolver;
    }*/

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.NEVER)
            .and()
            //.addFilterAt(new JwtCsrfFilter(jwtTokenRepository, resolver), CsrfFilter.class)
            //.csrf().ignoringAntMatchers("/**")
            //.and()
            //.authorizeRequests()
            //.antMatchers("/auth/login")
            //.authenticated()
            //.and()
            .httpBasic();
            //.authenticationEntryPoint(
            //        ((request, response, e) -> resolver.resolveException(request, response, null, e)));
        return http.build();
    }

    /*@Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.service);
    }*/
}