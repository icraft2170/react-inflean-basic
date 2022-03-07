  function CatItem({img}) {
    return (
      <li>
        <img src={img} style={{width: "150px", border: "1px solid red"}} />
      </li>
    );
  }

  export default CatItem;