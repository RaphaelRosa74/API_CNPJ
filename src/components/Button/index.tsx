import * as S from "./styles";

const Button = ({
  label,
  disabled = false,
  onClick,
  color = "primary",
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  color?: "primary" | "secondary" | undefined;
}) => {
  return (
    <S.Btn disabled={disabled} onClick={onClick} $color={color}>
      {label}
    </S.Btn>
  );
};

export default Button;
