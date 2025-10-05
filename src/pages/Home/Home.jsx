import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
    const { allCoin, currency } = useContext(CoinContext)
    const [displayCoin, setDisplayCoin] = useState([])
    const [input, setInput] = useState("")
    const [sortMarketCapAsc, setSortMarketCapAsc] = useState(true)
    const [sortChangeAsc, setSortChangeAsc] = useState(true)

    const inputHandler = (event) => {
        setInput(event.target.value)
        if (event.target.value === '') {
            setDisplayCoin(allCoin)
        }
    }

    const searchHandler = async (event) => {
        event.preventDefault()
        const coins = allCoin.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        )
        setDisplayCoin(coins)
    }

    useEffect(() => {
        setDisplayCoin(allCoin)
    }, [allCoin])

    // Sort by Market Cap
    const sortByMarketCap = () => {
        const sorted = [...displayCoin].sort((a, b) => {
            return sortMarketCapAsc ? a.market_cap - b.market_cap : b.market_cap - a.market_cap
        })
        setDisplayCoin(sorted)
        setSortMarketCapAsc(!sortMarketCapAsc)
    }

    // Sort by Percentage Change 24H
    const sortByChange = () => {
        const sorted = [...displayCoin].sort((a, b) => {
            return sortChangeAsc ? a.price_change_percentage_24h - b.price_change_percentage_24h : b.price_change_percentage_24h - a.price_change_percentage_24h
        })
        setDisplayCoin(sorted)
        setSortChangeAsc(!sortChangeAsc)
    }

    return (
        <div className='home'>
            <div className="hero">
                <h1>Largest <br /> Crypto Marketplace</h1>
                <p>Welcome to the World's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>

                <div className="form-and-buttons-row">
                    <form onSubmit={searchHandler}>
                        <input onChange={inputHandler} list='coin-list' type="text" placeholder='Search crypto..' required value={input} />
                        <datalist id="coin-list">
                            {allCoin.map((item, index) => (
                                <option key={index} value={item.name} />
                            ))}
                        </datalist>
                        <button type='submit'>Search</button>
                    </form>

                    <div className="sort-buttons-container">
                        <button onClick={sortByMarketCap} className="sort-button">
                            Sort by Market Cap
                        </button>
                        <button onClick={sortByChange} className="sort-button">
                            Sort by 24H Change
                        </button>
                    </div>
                </div>
            </div>

            <div className='crypto-table'>
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: 'center' }}>24H Change</p>
                    <p className='market-cap'>Market Cap</p>
                </div>
                {
                    displayCoin.slice(0, 10).map((item, index) => (
                        <Link to={`/coin/${item.id}`} key={index} className="table-layout">
                            <p>{item.market_cap_rank}</p>
                            <div>
                                <img src={item.image} alt="" />
                                <p>{item.name + " - " + item.symbol}</p>
                            </div>
                            <p className='price'>{currency.symbol} {item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                                {(Math.floor(item.price_change_percentage_24h * 100) / 100).toFixed(2)}
                            </p>
                            <p className='market-cap'> {currency.symbol} {item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Home

