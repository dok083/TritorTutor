import React from 'react'

class Footer extends React.Component {
  render() {
    const style = {
        marginTop: '2em'
    };

    return (
      <footer>
        <div className='text-muted text-center' style={style}>
          &copy; 2017 OkaySoftware
        </div>
      </footer>
    );
  }
}

export default Footer
