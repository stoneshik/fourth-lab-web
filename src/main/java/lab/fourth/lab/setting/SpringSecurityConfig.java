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
            .authorizeRequests()
                //Доступ только для не зарегистрированных пользователей
                .antMatchers("/api/user/registration", "/api/user/auth").not().fullyAuthenticated()
                //Доступ только для пользователей с ролью Администратор
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/news").hasRole("USER")
                //Доступ разрешен всем пользователей
                .antMatchers("/", "/manifest.json", "/index", "/index.html", "/static/**").permitAll()

                //Все остальные страницы требуют аутентификации
            .anyRequest().authenticated()
            .and()
                //Настройка для входа в систему
                .formLogin()
                .loginPage("/")
                //Перенаправление на главную страницу после успешного входа
                .defaultSuccessUrl("/main")
                .permitAll()
            .and()
                .logout()
                .permitAll()
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