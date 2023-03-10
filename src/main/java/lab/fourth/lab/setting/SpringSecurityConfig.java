package lab.fourth.lab.setting;

import lab.fourth.lab.security.JwtCsrfFilter;
import lab.fourth.lab.security.JwtTokenRepository;
import lab.fourth.lab.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService service;
    private final JwtTokenRepository jwtTokenRepository;

    @Qualifier("handlerExceptionResolver")
    private final HandlerExceptionResolver resolver;

    public SpringSecurityConfig(
            @Autowired UserService userService,
            @Autowired JwtTokenRepository jwtTokenRepository,
            @Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver) {
        this.service = userService;
        this.jwtTokenRepository = jwtTokenRepository;
        this.resolver = resolver;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
                .disable()
                .addFilterAt(new JwtCsrfFilter(jwtTokenRepository, resolver), CsrfFilter.class)
                //Все остальные страницы требуют аутентификации
                //Настройка для входа в систему
                .formLogin()
                .loginPage("/")
                //Перенаправление на главную страницу после успешного входа
                .defaultSuccessUrl("/main")
            .and()
                .logout()
                .logoutSuccessUrl("/")
            .and()
                .httpBasic()
                .authenticationEntryPoint(
                        ((request, response, e) -> resolver.resolveException(request, response, null, e)));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.service);
    }

}
