import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from 'react'
import { Drawer, Input, PrimaryLayout, Select, drawerRef } from '../../components'
import { Table, Td, TdMenu } from '../../components/table'
import { SimpleForm } from '../../components/forms'
import { BlueBtn } from '../../components/buttons'
import { axios } from '../../lib'

const People = () => {
  const limit: number = 20;

  // for modal
  const ref = useRef<drawerRef>(null)

  // for abort controller
  const abort = useRef<{
    getAll?: AbortController
  }>({})

  // for new person form
  const [form, setForm] = useState<{
    name: string,
    country?: string,
    phone?: string,
    email?: string,
    company?: string
  }>({ name: "" })

  // for form submit conditions
  const [conditions, setConditions] = useState<{
    submiting?: boolean,
    error?: string
  }>({})

  // for search
  const [search, setSearch] = useState<string | null>(null)

  const [state, setState] = useState<{
    pages?: number[],
    total?: number,
    items?: {}[],
    activePage?: number
  }>({})

  // to listen input events
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
        await axios.post('/customers/people/insert', form)

        alert("Success")

        setForm({ name: '' })

        getItems?.()

        ref?.current?.close?.()
      } catch (err: any) {
        setConditions((state) => ({ ...state, error: err?.response?.data?.message || "Something Went Wrong" }))
      } finally {
        setConditions((state) => ({ ...state, submiting: false }))
      }
    }
  }

  const getItems = async (page = 1) => {
    if (abort?.current?.getAll) {
      abort?.current?.getAll?.abort()
    }

    abort.current.getAll = new AbortController()

    try {
      const res = await axios.get('/customers/people/all', {
        signal: abort?.current?.getAll?.signal,
        params: {
          total: true,
          limit,
          search,
          skip: page > 1 ? limit * (page - 1) : 0,
        }
      })

      const pages: number[] = []

      for (let i = page - Math.floor(4 / 2); i <= page + Math.floor(4 / 2); i++) {
        if (i > 0 && i <= Math.ceil(res?.['data']?.data?.total / limit)) {
          pages.push(i);
        }
      }

      setState({
        ...res?.['data']?.data,
        pages,
        activePage: page
      })
    } catch (err: any) {
      if (err?.code !== "ERR_CANCELED") {
        alert(err?.response?.data?.message)
      }
    }
  }

  useEffect(() => {
    getItems?.()
  }, [search])

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

          <Select
            container='w-full'
            className='w-full'
            label='Company'
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
          add new person
        </BlueBtn>}

        search={{
          onChange: (e) => setSearch(e?.target?.value),
          value: search
        }}

        refresh={getItems}
      >
        <Table
          titles={['name', 'company', 'country', 'phone', 'email', '']}
        >
          {
            state?.items?.map((v: any, k: number) => {
              return <tr key={k}>
                <Td>{v?.name}</Td>
                <Td>{v?.company}</Td>
                <Td>
                  {
                    v?.country && <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                      {v?.country}
                    </button>
                  }
                </Td>
                <Td>{v?.phone}</Td>
                <Td>{v?.email}</Td>
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
            })
          }
        </Table>

        <div className='ml-auto flex flex-row gap-2 items-center'>
          {
            state?.pages?.map((v: number, k: number) => {
              return <button
                key={k}
                onClick={() => { if (v !== state?.activePage) getItems(v) }}
                className={`px-3 p-1 text-sm border bg-white rounded-md font-medium ${state?.activePage == v ? 'text-primary-blue border-primary-blue' : 'text-primary-black ease-in-out duration-500 border border-white hover:bg-primary-border hover:border-primary-border'}`}
              >
                {v}
              </button>
            })
          }
        </div>
      </PrimaryLayout>
    </Fragment >
  )
}

export default People