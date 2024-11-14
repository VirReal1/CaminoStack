import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { CheckIcon } from 'primereact/icons/check';
import { useNavigate } from 'react-router-dom';

const Purchase = () => {
  const navigate = useNavigate();
  const onReturnHome = () => {
    navigate('/');
  };
  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Card style={{ width: '30rem' }}>
        <div className="flex justify-content-center text-green-500 mb-4">
          <CheckIcon scale={64} />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Purchase Successful</h2>
        <p className="mb-6 text-center">Thank you for your purchase! Your order has been processed and you will receive your items soon.</p>
        <div className="flex justify-content-end">
          <Button onClick={onReturnHome} label="Return to Home" />
        </div>
      </Card>
    </div>
  );
};

export default Purchase;
