import React, { useEffect, useState } from 'react';
import './component.css';
import { api } from '../api/api';
import Notification from "../components/notifications";

const AuthForm = () => {
	const [phone, setPhone] = useState<string>();
	const [otpCode, setOtpCode] = useState<string>();
	const [isContinue, setIsContinue] = useState<boolean>(false);
	const [timer, setTimer] = useState<number>(60);
	const [codeRepeat, setCodeRepeat] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const [notification, setNotification] = useState({ message: '', type: '', show: false });
	const [click, setClick] = useState<number>(1);

	const startTimer = () => {
		setIsContinue(true);
		setTimer(60);
		setCodeRepeat(false);
	}

	const createOtpCode = async () => {
		if (!phone) {
			setError('Поле является обязательным');
		} else {
			setError('');
			startTimer();
			await api.createOtpCode(Number(phone));
		}
	};

	const login = async () => {
		if (!otpCode || otpCode.toString().length !== 6) {
			setError('Код должен содержать 6 цифр');
		}
		else {
			const result = await api.signing(Number(phone), Number(otpCode));
			setError('');
			if (result && result.success) {
				setTimer(0);
				setNotification({ message: 'Вы успешно вошли в сисему!', type: 'Success', show: true });
			}
			else {
				setClick(click + 1);
				setNotification({ message: 'Неправильный отп код!', type: 'Error', show: true });
			}
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (timer > 0) {
			const time = setTimeout(() => setTimer(timer - 1), 1000);
			return () => clearTimeout(time);
		}
		else {
			setCodeRepeat(true);
		}
	}, [isContinue, timer]);

	return (
		<div>
			<form onSubmit={handleSubmit} className='form'>
				{error && <div style={{ color: "red" }}>{error}</div>}
				<span className='title'>Вход</span>
				<span className='header'>Введите номер телефона для входа в личный кабинет</span>
				<input className='phone' type="number" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)}
				/>
				{isContinue && (
					<input className='otpCode'
						type="number"
						placeholder="Проверочный код"
						value={otpCode}
						onChange={(e) => setOtpCode(e.target.value)}
					/>)}
				<div className='buttonBlock'>
					<button type="submit" onClick={isContinue ? login : createOtpCode} className='buttonForm'>{isContinue ? 'Войти' : 'Продолжить'}</button>
				</div>
				{isContinue && (codeRepeat ? (
					<button onClick={startTimer} className='repeatCode'>Запросить код ещё раз</button>
				) : (
					<span className='timer'>Запросить код повторно можно через {timer} секунд</span>
				))}
			</form>
			<Notification message={notification.message} type={notification.type} show={notification.show} click={click} />
		</div>
	);
};

export default AuthForm;

