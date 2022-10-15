import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import MaterialReport from "./materials"
import MonthReport from "./month"
import ServicesReport from "./services"
import UserReport from "./user"
import YearReport from "./year"

const Reports = () => {
  return (
    <Tabs marginTop={50} variant='soft-rounded' colorScheme={'teal'} >
        <TabList display={'flex'} flexWrap={'wrap'}>
            <Tab>Yearly Reports</Tab>
            <Tab>Monthly Reports</Tab>
            <Tab>User's Expenses</Tab>
            <Tab>Materials Expenses</Tab>
            <Tab>Services Expenses</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <YearReport />
            </TabPanel>
            <TabPanel>
                <MonthReport />
            </TabPanel>
            <TabPanel>
                <UserReport />
            </TabPanel>
            <TabPanel>
                <MaterialReport />
            </TabPanel>
            <TabPanel>
                <ServicesReport />
            </TabPanel>
        </TabPanels>
    </Tabs>
  )
}

export default Reports
