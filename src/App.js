import "./App.css";
import { Layout, Menu, Card, Row, Col, Checkbox, Select, Button } from "antd";
import "antd/dist/antd.css";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import originalData from "./data.json";
import { useEffect, useState } from "react";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { Option } = Select;
const { Meta } = Card;

function App() {
  const [highToLow, setHighToLow] = useState(false);
  const [lowToHigh, setLowToHigh] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [filteredDataList, setfilteredDataList] = useState([]);
  const categoriesListTemp = [
    "electronics",
    "men's clothing",
    "women's clothing",
    "jewelery",
  ];
  const barndsListTemp = ["Adidas", "J and J", "Apex", "Raymond"];
  const categoriesList = [];
  const brandsList = [];
  const checkboxes = [
    {
      name: "s",
      key: "s",
      label: "Check Box 1",
    },
    {
      name: "m",
      key: "m",
      label: "Check Box 2",
    },
    {
      name: "l",
      key: "l",
      label: "Check Box 3",
    },
    {
      name: "xl",
      key: "xl",
      label: "Check Box 4",
    },
  ];

  let myData = JSON.parse(JSON.stringify(originalData));

  useEffect(() => {
    setfilteredDataList(myData);
  }, []);

  // High to low
  function applyHighToLow(data) {
    return data.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  // Low to high
  function applyLowToHigh(data) {
    return data.sort(function (a, b) {
      return a.price - b.price;
    });
  }

  for (const category of categoriesListTemp) {
    categoriesList.push(<Option key={category}>{category}</Option>);
  }

  for (const brand of barndsListTemp) {
    brandsList.push(<Option key={brand}>{brand}</Option>);
  }

  // useEffect(() => {}, [filteredDataList]);

  const handleSizeChange = (event) => {
    const tempCheckedItems = {
      ...checkedItems,
      [event.target.name]: event.target.checked,
    };
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });

    const keys = Object.keys(tempCheckedItems);
    const usableKeys = keys.filter((key) => {
      return tempCheckedItems[key];
    });

    const filteredDataListTemp = myData.filter((prod) => {
      return usableKeys.every((key) => prod.size.includes(key));
    });

    // Apply High Low Filter
    setfilteredDataList(
      lowToHigh
        ? applyLowToHigh(filteredDataListTemp)
        : highToLow
        ? applyHighToLow(filteredDataListTemp)
        : filteredDataListTemp
    );
  };

  function handleCategorySelection(value) {
    if (value.length === 0) {
      setfilteredDataList(
        lowToHigh
          ? applyLowToHigh(myData)
          : highToLow
          ? applyHighToLow(myData)
          : myData
      );
      return;
    }
    const filteredDataListTemp = myData.filter((product) => {
      return value.includes(product.category);
    });
    setfilteredDataList(
      lowToHigh
        ? applyLowToHigh(filteredDataListTemp)
        : highToLow
        ? applyHighToLow(filteredDataListTemp)
        : filteredDataListTemp
    );
  }

  function handleBrandSelection(value) {
    if (value.length === 0) {
      setfilteredDataList(
        lowToHigh
          ? applyLowToHigh(myData)
          : highToLow
          ? applyHighToLow(myData)
          : myData
      );
      return;
    }
    const filteredDataListTemp = myData.filter((product) => {
      return value.includes(product.brand);
    });
    setfilteredDataList(
      lowToHigh
        ? applyLowToHigh(filteredDataListTemp)
        : highToLow
        ? applyHighToLow(filteredDataListTemp)
        : filteredDataListTemp
    );
  }

  function onChangeHighToLow(e) {
    if (!highToLow) {
      setHighToLow(true);
      setLowToHigh(false);

      setfilteredDataList(applyHighToLow(filteredDataList));
    } else {
      setfilteredDataList(myData);
      setHighToLow(false);
    }
  }

  function onChangeLowToHigh(e) {
    if (!lowToHigh) {
      setLowToHigh(true);
      setHighToLow(false);
      setfilteredDataList(applyLowToHigh(filteredDataList));
    } else {
      setfilteredDataList(myData);
      setLowToHigh(false);
    }
  }

  function clearAll() {
    setHighToLow(false);
    setLowToHigh(false);
    myData = myData.sort(function (a, b) {
      return a.id - b.id;
    });
    setfilteredDataList(myData);
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Flipkart</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Price">
              <Menu.Item key="1">
                <Checkbox
                  key="1"
                  className="hightolow"
                  onChange={(e) => onChangeHighToLow(e)}
                  checked={highToLow}
                >
                  High to Low
                </Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox
                  className="lowtohigh"
                  key="2"
                  onChange={(e) => onChangeLowToHigh(e)}
                  checked={lowToHigh}
                >
                  Low to High
                </Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Category">
              <Menu.Item
                className="selectMenuItem"
                key="5"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                    marginTop: "100px",
                    marginBottom: "100px",
                  }}
                  placeholder="Categories"
                  onChange={handleCategorySelection}
                >
                  {categoriesList}
                </Select>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub7" icon={<LaptopOutlined />} title="Brands">
              <Menu.Item
                className="selectMenuItem"
                key="7"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                    marginTop: "100px",
                    marginBottom: "100px",
                  }}
                  placeholder="Brands"
                  onChange={handleBrandSelection}
                >
                  {brandsList}
                </Select>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Size">
              {checkboxes.map((item, index) => (
                <Menu.Item key={index}>
                  <label key={item.key}>
                    {item.name}
                    <Checkbox
                      name={item.name}
                      checked={checkedItems[item.name]}
                      onChange={handleSizeChange}
                    />
                  </label>
                </Menu.Item>
              ))}
            </SubMenu>
            <Button type="dashed" size="middle" onClick={clearAll}>
              Clear All
            </Button>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: "75vh",
            }}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {filteredDataList.map((product) => (
                <Col className="gutter-row" span={6} key={product.id}>
                  <Card
                    hoverable
                    style={{
                      width: 240,
                      height: 350,
                      borderRadius: "10px",
                    }}
                    cover={
                      <img
                        style={{
                          width: 240,
                          height: 240,
                          borderRadius: "10px",
                        }}
                        alt="example"
                        src={product.image}
                      />
                    }
                  >
                    <Meta
                      title={product.title}
                      description={"$" + product.price}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
