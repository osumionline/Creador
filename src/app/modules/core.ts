import { Provider } from "@angular/core";
import ApiService from "@services/api.service";
import AuthService from "@services/auth.service";
import ClassMapperService from "@services/class-mapper.service";
import UserService from "@services/user.service";

function provideCore(): Provider[] {
  return [ApiService, AuthService, ClassMapperService, UserService];
}
export default provideCore;
