import { useRef } from 'react'
import { Card, DrawerForm, Table, Td, TdMenu } from '../../components'

const Customer = () => {
  const ref = useRef<any>(null)

  return (
    <div className='flex flex-col gap-7'>
      <DrawerForm ref={ref}>
        h
      </DrawerForm>

      <Card className='p-[1rem] md:px-[2.5rem] flex flex-wrap gap-3 items-center'>
        <input
          type="text"
          placeholder='Search'
          className='mr-auto border border-primary-border bg-white text-sm text-primary-black rounded-md py-1 px-3 easy-in-out duration-500 focus:border-primary-blue'
        />

        <select
          className='capitalize appearance-none text-sm text-primary-black bg-white border border-primary-border rounded-md px-3 py-1 easy-in-out duration-500 hover:bg-primary-border'
        >
          <option
            className='capitalize text-sm text-primary-black'
            value="recent">
            recent
          </option>
        </select>

        <button
          className='bg-white border border-primary-border rounded-md px-5 py-1 text-sm capitalize text-primary-black easy-in-out duration-500 hover:bg-primary-border'
        >
          refresh
        </button>
      </Card>

      <Card className='p-[1rem] md:p-[2.5rem] flex flex-col gap-4'>
        <div className='flex flex-wrap items-center gap-3'>
          <button
            className='mr-auto capitalize text-[50px] text-primary-black text-left easy-in-out duration-500 hover:text-primary-blue'
          >
            &#x2190;
          </button>

          <button
            className='border border-primary-blue bg-primary-blue rounded-md text-white px-3 py-1 text-sm capitalize easy-in-out duration-500 hover:bg-secondary-blue hover:border-secondary-blue'
          >
            add new customer
          </button>
        </div>

        <Table
          titles={['type', 'name', 'country', 'phone', 'email', '']}
        >
          <tr>
            <Td>
              <button
                className='text-xs text-primary-blue bg-light-blue rounded-md py-1 px-3 capitalize pointer-events-none'
              >
                people
              </button>
            </Td>
            <Td>anson benny</Td>
            <Td>
              <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                india
              </button>
            </Td>
            <Td>+91732523672</Td>
            <Td>demo@gmail.com</Td>
            <TdMenu>
              <button>
                show
              </button>
              <button>
                edit
              </button>
              <button>
                delete
              </button>
            </TdMenu>
          </tr>
          <tr>
            <Td>
              <button
                className='text-xs text-rose-500 bg-rose-200 rounded-md py-1 px-3 capitalize pointer-events-none'
              >
                company
              </button>
            </Td>
            <Td>shebin</Td>
            <Td>
              <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                india
              </button>
            </Td>
            <Td>+91732523672</Td>
            <Td>demo@gmail.com</Td>
            <TdMenu>
              <button>
                show
              </button>
              <button>
                edit
              </button>
              <button>
                delete
              </button>
            </TdMenu>
          </tr>
          <tr>
            <Td>
              <button
                className='text-xs text-primary-blue bg-light-blue rounded-md py-1 px-3 capitalize pointer-events-none'
              >
                people
              </button>
            </Td>
            <Td>anson benny</Td>
            <Td>
              <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                india
              </button>
            </Td>
            <Td>+91732523672</Td>
            <Td>demo@gmail.com</Td>
            <TdMenu>
              <button>
                show
              </button>
              <button>
                edit
              </button>
              <button>
                delete
              </button>
            </TdMenu>
          </tr>
          <tr>
            <Td>
              <button
                className='text-xs text-rose-500 bg-rose-200 rounded-md py-1 px-3 capitalize pointer-events-none'
              >
                company
              </button>
            </Td>
            <Td>shebin</Td>
            <Td>
              <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                india
              </button>
            </Td>
            <Td>+91732523672</Td>
            <Td>demo@gmail.com</Td>
            <TdMenu>
              <button>
                show
              </button>
              <button>
                edit
              </button>
              <button>
                delete
              </button>
            </TdMenu>
          </tr>
        </Table>

        <div className='ml-auto flex flex-row gap-2 items-center'>
          <button className='px-3 p-1 text-sm text-primary-blue border border-primary-blue bg-white rounded-md font-medium'>1</button>
          <button className='px-3 p-1 text-sm text-primary-black bg-white rounded-md font-medium easy-in-out duration-500 border border-white hover:bg-primary-border hover:border-primary-border'>2</button>
          <button className='px-3 p-1 text-sm text-primary-black bg-white rounded-md font-medium easy-in-out duration-500 border border-white hover:bg-primary-border hover:border-primary-border'>3</button>
        </div>
      </Card>
    </div>
  )
}

export default Customer