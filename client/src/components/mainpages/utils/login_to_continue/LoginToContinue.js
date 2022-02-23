export function LoginToContinue(isLogged, href) {
  if (!isLogged) {
    alert("Đăng nhập để tiếp tục");
    window.location.href = "/login";
  } else {
    window.location.href = `${href}`;
  }
}
