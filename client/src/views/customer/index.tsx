import { FormEvent, useRef } from 'react'
import { ActionsArea, Card, Drawer, Input, Select, drawerRef } from '../../components'
import { Table, Td, TdMenu } from '../../components/table'
import { SimpleForm } from '../../components/forms'
import { BlueBtn, WhiteBtn } from '../../components/buttons'

const Customer = () => {
  const ref = useRef<drawerRef>(null)

  const onSubmit = (e: FormEvent) => {
    e?.preventDefault?.()

    console.log("Submit")
  }

  return (
    <div className='flex flex-col gap-7'>
      <Drawer
        ref={ref}
      >
        <SimpleForm
          onSubmit={onSubmit}
        >
          <div>
            <Select
              className='w-full'
              label='Type'
              placeholder='Select Type'
              type='text'
              required
            >
              <option value="People">People</option>
              <option value="Company">Company</option>
            </Select>
          </div>

          <div>
            <Select
              className='w-full'
              label='People'
              placeholder='Search Here'
              type='text'
              required
              onInput={(e) => {

              }}
              onSelect={(v) => {
                console.log(v?.target?.value)
                console.log(v?.target?.text)
                // setState(v?.view)
              }}
            >
              <option value="hello">Hai</option>
            </Select>
          </div>
        </SimpleForm>
      </Drawer>

      <Card className='container md:py-[1rem] flex flex-wrap gap-3 items-center'>
        <Input
          name='search'
          type="text"
          placeholder='Search'
          className='mr-auto'
        />

        <select
          className='capitalize appearance-none text-sm text-primary-black bg-white border border-primary-border rounded-md px-3 py-1 ease-in-out duration-500 hover:bg-primary-border'
        >
          <option
            className='capitalize text-sm text-primary-black'
            value="recent">
            recent
          </option>
        </select>

        <WhiteBtn
          type='button'
        >
          refresh
        </WhiteBtn>
      </Card>

      <Card className='container flex flex-col gap-4'>
        <ActionsArea>
          <BlueBtn
            type='button'
            onClick={() => ref?.current?.open?.()}
          >
            add new customer
          </BlueBtn>
        </ActionsArea>

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
          <button className='px-3 p-1 text-sm text-primary-black bg-white rounded-md font-medium ease-in-out duration-500 border border-white hover:bg-primary-border hover:border-primary-border'>2</button>
          <button className='px-3 p-1 text-sm text-primary-black bg-white rounded-md font-medium ease-in-out duration-500 border border-white hover:bg-primary-border hover:border-primary-border'>3</button>
        </div>
      </Card>
    </div>
  )
}

export default Customer