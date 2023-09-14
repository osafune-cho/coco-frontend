import { css } from "../../styled-system/css"

const footerStyle = css({
    position: "absolute",
    bottom: "0",
    margin: "0px auto 10px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  })

export const Footer = () => {
    return(
        <footer className={footerStyle}>
            <p>© 2023 <a href="https://github.com/momeemt" target="_blank" >momeemt</a>, <a href="https://github.com/iorin-io" target="_blank">iorin.io</a>, <a href="https://github.com/s7tya" target="_blank">s7tya</a></p>
        </footer>
    )
}