import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';

import styles from './ArticleParamsForm.module.scss';
import {ArticleStateType, defaultArticleState, OptionType} from '../../constants/articleProps';

import {  useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type TArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({articleState, setArticleState}: TArticleParamsFormProps) => {

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const formElement = useRef<HTMLDivElement | null>(null);
	const [fontFamilyOption, setfontFamilyOption] = useState<OptionType>(articleState.fontFamilyOption);
	const [fontColor, setFontColor] = useState<OptionType>(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(articleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState<OptionType>(articleState.contentWidth);
	const [fontSizeOption, setFontSizeOption] = useState<OptionType>(articleState.fontSizeOption);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamilyOption,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSizeOption
		})
	};

	const handleFormReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(defaultArticleState);
		// распространять на хуки?
	};

	const onClick = () => {
		// propagation?
		setIsMenuOpen(prev => !prev);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formElement,
		onChange: setIsMenuOpen,
	});


	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={onClick} />
			<aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen, })} ref={formElement}>
				<form className={styles.form} onSubmit={handleFormSubmit} onReset={handleFormReset}>
					<Text size={31} fontStyle='normal' uppercase={true} as={'h1'} align='left' weight={800}>Задайте параметры</Text>
					{/* <Select title='шрифт' ></Select> */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
