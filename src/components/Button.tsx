interface ButtonProps {
  children?: React.ReactNode; // Тип для children
  className?: string;
  onClick?: () => void; // Опциональная функция для onClick
}

const Button: React.FC<ButtonProps> = ({ children, className = '', onClick = () => {} }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
