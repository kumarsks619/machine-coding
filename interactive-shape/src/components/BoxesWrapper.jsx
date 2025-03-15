import React, { useEffect, useState, useMemo, useCallback, useRef } from "react"
import Box from "./Box"

const BoxesWrapper = ({ arrays }) => {
	const [fillOrder, setFillOrder] = useState([])
	const [isUnFillingStarted, setIsUnFillingStarted] = useState(false)
	const timeoutId = useRef(null)

	// [OPTIMIZATION] added click listener only on the wrapper div and used the data attribute to get the clicked box's coordinate
	const handleBoxesWrapperClick = ($event) => {
		if (isUnFillingStarted) {
			return
		}
		const clickedBoxElement = $event.target
		const clickedCoordinate = clickedBoxElement.getAttribute("data-coordinate")
		if (clickedCoordinate) {
			setFillOrder((prev) => [...prev, clickedCoordinate])
		}
	}

	const getIsFilled = (rootIndex, subIndex) => {
		const fillEntry = `${rootIndex}:${subIndex}`
		return fillOrder.includes(fillEntry)
	}

	const areAllFilled = useMemo(() => {
		const visibleBoxes = arrays.reduce((acc, curr) => {
			curr.forEach((isVisible) => {
				if (isVisible) {
					acc += 1
				}
			})
			return acc
		}, 0)
		return fillOrder.length === visibleBoxes
	}, [fillOrder, arrays])

	const unFillInOrder = useCallback(() => {
		if (fillOrder.length === 0) {
			return
		}
		setFillOrder((prev) => {
			const prevCopy = [...prev]
			prevCopy.pop()
			return prevCopy
		})
		timeoutId.current = setTimeout(unFillInOrder, 1000)
	}, [fillOrder])

	useEffect(() => {
		// to stop calling unFillInOrder when all boxes are un-filled
		if (fillOrder.length === 0) {
			clearInterval(timeoutId.current)
			setIsUnFillingStarted(false)
		}
		if (!areAllFilled || fillOrder.length === 0) {
			return
		}
		// start un-filling boxes in order after 1 second
		setIsUnFillingStarted(true)
		timeoutId.current = setTimeout(unFillInOrder, 1000)
	}, [areAllFilled, fillOrder, unFillInOrder])

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "10px" }} onClick={handleBoxesWrapperClick}>
			{arrays.map((array, rootIndex) => (
				<div key={rootIndex} style={{ display: "flex", gap: "10px" }}>
					{array.map((show, subIndex) => (
						<Box key={subIndex} show={show} fill={getIsFilled(rootIndex, subIndex)} coordinate={`${rootIndex}:${subIndex}`} disable={isUnFillingStarted} />
					))}
				</div>
			))}
		</div>
	)
}

export default BoxesWrapper
