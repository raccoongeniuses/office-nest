import { Controller, Request, Post, UseGuards, Get, Render, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req, @Res() res) {
        const result = await this.authService.login(req.user);
        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        return res.redirect('/dashboard');
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('login')
    @Render('login')
    loginPage() {
        return { title: 'Login' };
    }

    @Get('auth/logout')
    logout(@Res() res) {
        res.clearCookie('access_token');
        return res.redirect('/login');
    }
}
