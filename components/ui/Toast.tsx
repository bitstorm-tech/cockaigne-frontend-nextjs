type Props = { show: boolean; children: React.ReactNode; onTimout: () => void };

export default function Toast({ show, children, onTimout }: Props) {
  if (!show) {
    return null;
  } else {
    setTimeout(onTimout, 2500);
  }

  return (
    <div className="toast-center toast-bottom toast mb-16 w-screen">
      <div className="alert alert-success">
        <span>{children}</span>
      </div>
    </div>
  );
}
