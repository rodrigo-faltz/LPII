import { ReactNode } from "react";

type LoadingIndicatorProps = {
  message?: ReactNode;
};

export const LoadingIndicator = ({
  message = "Carregando...",
}: LoadingIndicatorProps) => {
  return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      <p className="mt-3 text-muted">{message}</p>
    </div>
  );
};
