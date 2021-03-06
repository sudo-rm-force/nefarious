import React, { Component, Fragment } from 'react'
import ConstituencyPanel from './constituencypanel'
import ConstituencyCard from './constituencycard'
import election from '../../web3/web3-config'
import search from '../../assets/search.svg'
import close from '../../assets/close.svg'
import '../../styles/main.scss'
import { createInflateRaw } from 'zlib';

class Constituency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            active: ''
        }

        this.list = ['Roorkee', 'Delhi West', 'Aligarh', 'Hyderabad East', 'Srinagar', 'Jamshedpur', 'Mumbai South', 'Chennai Central', 'Surat', 'Mysore']
        this.items = []

        this.close = this.close.bind(this)
        this.start = this.start.bind(this)
        this.click = this.click.bind(this)
        this.splice = this.splice.bind(this)
    }

    close() {
        this.setState({ start:false })
    }

    start(active) {
        this.setState({ start:true })
        this.setState({active:active})
    }

    click() {
        this.props.hidesignout()
        this.items = this.list
        this.forceUpdate()
    }

    search(event) {
        this.items = this.list.filter(x => x == event.target.value)
        this.forceUpdate()
    }

    splice(text) {
        this.items = this.items.splice(this.items.indexOf(text),1)
        this.forceUpdate()
    }

    componentDidMount() {
        // election.methods.getConstituencies(this.state.AdminId).call((res) => {
        //     console.log(res)
        // })
        this.items = this.list
    }

    render() {
        return(
            <div className='constituency' onClick={this.click}>
                <div className='constituency--heading'>Constituency</div>
                <div className='constituency--search'>
                    <input className='constituency--search-input' placeholder='Search' onChange={this.search.bind(this)}/>
                    <img className='constituency--search-icon' src={search} alt='search' />
                </div>
                <div className='constituency--list'>
                    {this.items.map((place) => (<ConstituencyPanel name={place} handleClick={this.start}/>))}
                </div>
                { this.state.start ? (<ConstituencyCard name={this.state.active} close={this.close} splice={this.splice}/>) : (<Fragment />) } 
            </div>
        )
    }
}

export default Constituency
