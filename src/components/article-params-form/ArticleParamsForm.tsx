import { useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

type TArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: TArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const formElement = useRef<HTMLDivElement | null>(null);
	const [fontFamilyOption, setfontFamilyOption] = useState<OptionType>(
		articleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		articleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		articleState.contentWidth
	);
	const [fontSizeOption, setFontSizeOption] = useState<OptionType>(
		articleState.fontSizeOption
	);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamilyOption,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSizeOption,
		});
	};

	const handleFormReset = () => {
		setArticleState(defaultArticleState);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontColor(defaultArticleState.fontColor);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setfontFamilyOption(defaultArticleState.fontFamilyOption);
	};

	const onClick = () => {
		setIsMenuOpen((prev) => !prev);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formElement,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={onClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={formElement}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text
						size={31}
						fontStyle='normal'
						uppercase={true}
						as={'h1'}
						align='left'
						weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						onChange={setfontFamilyOption}></Select>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={setFontSizeOption}
						name='font-size'></RadioGroup>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}></Select>
					<Separator></Separator>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}></Select>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
