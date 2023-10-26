import styled from "@emotion/styled";

export const SignContainer = styled.div`
  display: flex;
`;

export const SignImage = styled.div`
  background: url(https://e1.pxfuel.com/desktop-wallpaper/461/478/desktop-wallpaper-whatsapp-dark-whatsapp-chat.jpg)
    rgba(255, 255, 255, 0);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: lighten;
  flex: 1;
`;

export const SignForm = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  h1 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    color: #04014a;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 55%;
  }
  a {
    color: #04014a;
    text-decoration: none;
    font-size: 16px;
  }
  a:hover {
    text-decoration: underline;
  }
  h3 {
    width: 70%;
    text-align: center;
    font-size: 1rem;
    margin-bottom: 2rem;
    font-weight: lighter;
    color: #04014a;
  }
`;

export const SignLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 55%;
`;