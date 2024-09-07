import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
interface WithBackProps {
  children?: ReactNode;
}

export default function WithBack({ children }: WithBackProps) {
  const navigate = useNavigate();
  const onGoback = () => navigate("/");
  return (
    <div>
      <Button onClick={onGoback}>Go Back</Button>
      {children}
    </div>
  );
}
