import React from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from './type';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => children;
