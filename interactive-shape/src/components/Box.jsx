import React from "react"

const Box = ({ show = true, fill = false, coordinate, disable = false }) => {
	return <div data-coordinate={coordinate} style={{ width: "80px", height: "80px", border: "1px solid #000", backgroundColor: fill ? "green" : "transparent", visibility: show ? "visible" : "hidden", cursor: fill | disable ? "not-allowed" : "pointer" }} />
}

export default Box
