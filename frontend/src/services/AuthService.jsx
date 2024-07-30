import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

class AuthService {
    login(username, password) {
        return axios
            .post(`http://localhost:8080/auth/sign-in`, { username, password })
            .then(response => {
                if (response.data.token) {
                    const token = response.data.token;
                    localStorage.setItem('user', JSON.stringify({ token }));
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    }

    getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return null;

        const decodedToken = jwtDecode(user.token);
        return {
            username: decodedToken.sub,
            id: decodedToken.id,
            role: decodedToken.role ? decodedToken.role : "none",
            exp: decodedToken.exp ? decodedToken.exp : "none",
            email: decodedToken.email ? decodedToken.email : "none",
            phone: decodedToken.phone ? decodedToken.phone : "none",
        };
    }

    isTokenExpired() {
        if (!localStorage.getItem('user')) {
            return true;
        }
        const exp = this.getCurrentUser().exp;
        const currentTime = Date.now() / 1000; // current time in seconds
        return exp < currentTime;
    }

    getUsername() {
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.username : null;
    }

    getRole() {
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.role : null;
    }

    getEmail(){
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.email : null;
    }

    getPhone(){
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.phone : null;
    }

    getUserId() {
        const currentUser = this.getCurrentUser();
        console.log(currentUser);
        return currentUser ? currentUser.id : null;
    }
}

export default new AuthService();
