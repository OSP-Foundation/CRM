import { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react'
import { Drawer, Input, PrimaryLayout, Select, drawerRef } from '../../components'
import { Table, Td, TdMenu } from '../../components/table'
import { SimpleForm } from '../../components/forms'
import { BlueBtn } from '../../components/buttons'
import { axios } from '../../lib'

const Company = () => {
  const ref = useRef<drawerRef>(null)

  const [form, setForm] = useState<{
    name: string,
    country?: string,
    phone?: string,
    email?: string,
    website?: string,
    contact?: string
  }>({ name: "" })

  const [conditions, setConditions] = useState<{
    submiting?: boolean,
    error?: string
  }>({})

  const InputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!conditions?.submiting) {
      setForm((state) => ({
        ...state,
        [e?.target?.name]: e?.target?.value
      }))
    }
  }

  const FormHandle = async (e: FormEvent) => {
    e?.preventDefault?.()

    if (!conditions?.submiting) {
      setConditions({ submiting: true })

      try {
        await axios.post('/customers/company/insert', form)

        alert("Success")

        setForm({ name: '' })

        ref?.current?.close?.()
      } catch (err: any) {
        setConditions((state) => ({ ...state, error: err?.response?.data?.message || "Something Went Wrong" }))
      } finally {
        setConditions((state) => ({ ...state, submiting: false }))
      }
    }
  }

  return (
    <Fragment>
      <Drawer
        ref={ref}
      >
        <SimpleForm
          onSubmit={FormHandle}
          {...conditions}
        >
          <Input
            container='w-full'
            className='w-full'
            label='name'
            placeholder='Enter Name'
            name='name'
            type='text'
            required
            value={form?.name}
            onChange={InputHandle}
          />

          <Input
            container='w-full'
            className='w-full'
            label='country'
            placeholder='Enter Country'
            name='country'
            type='text'
            value={form?.country}
            onChange={InputHandle}
          />

          <Input
            container='w-full'
            className='w-full'
            label='phone'
            placeholder='+1 646 221 3032'
            name='phone'
            type='text'
            value={form?.phone}
            onChange={InputHandle}
          />

          <Input
            container='w-full'
            className='w-full'
            label='email'
            placeholder='Enter Email'
            name='email'
            type='email'
            value={form?.email}
            onChange={InputHandle}
          />

          <Input
            container='w-full'
            className='w-full'
            label='website'
            placeholder='https://example.com'
            name='website'
            type='text'
            value={form?.website}
            onChange={InputHandle}
          />

          <Select
            container='w-full'
            className='w-full'
            label='Contact'
            placeholder='Search Here'
            type='text'
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
        </SimpleForm>
      </Drawer>

      <PrimaryLayout
        Actions={<BlueBtn
          type='button'
          onClick={() => ref?.current?.open?.()}
        >
          add new company
        </BlueBtn>}
      >
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
      </PrimaryLayout>
    </Fragment>
  )
}

export default Company