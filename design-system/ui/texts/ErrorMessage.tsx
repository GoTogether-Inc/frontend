import React from 'react';

interface ErrorMessageProps {
  children: string;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <h2 className="text-sm text-red-500">{children}</h2>;
}
