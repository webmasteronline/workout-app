import { useState, useEffect, useRef } from 'react'

export const useOutsideAlerter = (initialIsVisible) => {
	const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
	const ref =
		useRef(
			null
		) /** const ref - это ссылка на елемнт в нашем DOM дереве например - wrraper нашего меню - тем самым мы не будем ее трогать если клик идет по этому врапперу то мы ничего не делаем , но если клик будем по любой другой области экрана то wrapper будет закрываться */

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsComponentVisible(false)
		}
	} /** если мы кликнули именно не по нашему елементу ref мы закрываем менюшку */

	useEffect(() => {
		document.addEventListener(
			'click',
			handleClickOutside,
			true
		) /** отлеживает все клики по нашему контенту */
		return () => {
			document.removeEventListener(
				'click',
				handleClickOutside,
				true
			) /** удаляем слушатель из памяти  */
		}
	})

	return { ref, isComponentVisible, setIsComponentVisible }
}
