import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from 'react'
import { Drawer, Input, PrimaryLayout, Select, drawerRef } from '../../components'
import { Table, Td, TdMenu } from '../../components/table'
import { SimpleForm } from '../../components/forms'
import { BlueBtn } from '../../components/buttons'
import { axios } from '../../lib'

const Company = () => {
  const limit: number = 20;

  const ref = useRef<drawerRef>(null)

  const abort = useRef<{
    contacts?: AbortController,
    getAll?: AbortController,
    delete?: AbortController
  }>({})

  const [contact, setContact] = useState<{
    selected?: string,
    items?: {}[]
  }>({})

  const [form, setForm] = useState<{
    _id?: string,
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

  const [search, setSearch] = useState<string | null>(null)

  const [state, setState] = useState<{
    pages?: number[],
    total?: number,
    items?: {}[],
    activePage?: number
  }>({})

  const openDrawer = (v?: any) => {
    if (v) {
      setForm({ ...v, contact: v?.contact?._id ? v?.contact?._id : undefined })

      setContact({ selected: v?.contact?.name ? v?.contact?.name : undefined })
    } else {
      setForm({ name: '' })

      setContact({})
    }

    setConditions({})

    ref?.current?.open?.()
  }

  const deleteItem = async (_id: string) => {
    if (_id && window.confirm("Do you want delete?")) {
      if (abort?.current?.delete) {
        abort?.current?.delete?.abort()
      }

      abort.current.delete = new AbortController()

      try {
        await axios.delete("/customers/company", {
          data: {
            _id
          },
          signal: abort?.current?.delete?.signal
        })

        getItems?.()

        alert("Success")
      } catch (err: any) {
        if (err?.code !== "ERR_CANCELED") {
          alert(err?.response?.data?.message)
        }
      }
    }
  }

  const getItems = async (page = 1) => {
    if (abort?.current?.getAll) {
      abort?.current?.getAll?.abort()
    }

    abort.current.getAll = new AbortController()

    try {
      const res = await axios.get('/customers/company/', {
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

  const getContacts = async (e: ChangeEvent<HTMLInputElement>) => {
    setContact((state) => ({ ...state, selected: e?.target?.value, items: [] }));

    setForm((state) => ({ ...state, contact: undefined }))

    if (abort?.current?.contacts) {
      abort?.current?.contacts?.abort()
    }

    abort.current.contacts = new AbortController()

    try {
      const res = await axios.get('/customers/people/', {
        signal: abort?.current?.contacts?.signal,
        params: {
          limit: 20,
          search: e?.target?.value
        }
      })

      setContact((state) => ({ ...state, items: res?.['data']?.data?.items }))

    } catch (err: any) {
      if (err?.code !== "ERR_CANCELED") {
        alert(err?.response?.data?.message)
      }
    }
  }

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
        if (form?._id) {
          await axios.put('/customers/company/', form)
        } else {
          await axios.post('/customers/company/', form)
        }

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
            value={contact?.selected}
            onInput={getContacts}
            onSelect={(v) => {
              setContact((state) => ({ ...state, selected: v?.target?.text }))

              setForm((state) => ({ ...state, contact: v?.target?.value }))
            }}
          >
            {
              contact?.items?.map((v: any, k: number) => {
                return <option key={k} value={v?._id}>{v?.name}</option>
              })
            }
          </Select>
        </SimpleForm>
      </Drawer>

      <PrimaryLayout
        Actions={<BlueBtn
          type='button'
          onClick={() => openDrawer?.()}
        >
          add new company
        </BlueBtn>}

        search={{
          onChange: (e) => setSearch(e?.target?.value),
          value: search
        }}

        refresh={getItems}
      >
        <Table
          titles={['name', 'contact', 'country', 'phone', 'email', 'website', '']}
        >
          {
            state?.items?.map((v: any, k: number) => {
              return <tr key={k}>
                <Td>
                  {v?.name}
                </Td>
                <Td>{v?.contact?.name}</Td>
                <Td>
                  {
                    v?.country && <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                      {v?.country}
                    </button>
                  }
                </Td>
                <Td>{v?.phone}</Td>
                <Td>{v?.email}</Td>
                <Td>{v?.website}</Td>
                <TdMenu>
                  <button>
                    show
                  </button>
                  <button onClick={() => openDrawer?.(v)}>
                    edit
                  </button>
                  <button onClick={() => deleteItem(v?._id)}>
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

export default Company