import { ReactNode } from "react";
import * as S from "./styles";

function Modal({
  title,
  children,
  footer,
  small = false,
  onClose,
}: {
  title: string;
  children: ReactNode;
  footer: ReactNode;
  small?: boolean;
  onClose?: () => void;
}) {
  return (
    <S.Overlay onClick={onClose}>
      <S.ModalBox $small={small}>
        <S.ModalHeader>
          <h2>{title}</h2>
        </S.ModalHeader>
        <S.ModalBody>{children}</S.ModalBody>
        <S.ModalFooter>{footer}</S.ModalFooter>
      </S.ModalBox>
    </S.Overlay>
  );
}

export default Modal;
