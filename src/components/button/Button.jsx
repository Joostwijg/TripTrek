import "./Button.css"


function Button({ type, onClick, variant, children }) {
    return (
        <button type={type}  onClick={onClick} className={`button ${variant}`}>
            {children}
        </button>
    );
}

export default Button;